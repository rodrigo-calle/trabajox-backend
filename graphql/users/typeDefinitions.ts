import { ApolloServer, gql } from "apollo-server";
import { prismaClient } from "../../config/prismaClient";

const Users = prismaClient.user;

const typeDefinitions = gql`

        type Address {
            country: String
            city: String
            region: String
            province: String
        }

        type CustomAddress {
            addressInLine: String
            addressObject: Address
        }

        type MainData {
            firstName: String
            lastName: String
            email: String
            completeName: String
            phone: String
            whatsapp: String
        }

        type User {
            email: String!
            id: ID!
            firstName: String
            lastName: String
            completeName: String
            phone: String
            whatsapp: String
            customAddress: CustomAddress
            mainData: MainData
        }

        type Query {
            allUsers: [User!]!
            findUserByEmail(id: ID!): User
        }

        # TODO: Mutation
`

const resolvers = {
    Query: {
        allUsers: async () => {
            return Users.findMany({include: {
                Profile: { 
                    include: { 
                        Address: true,
                        Contact: true
                    }
                }
            }})
        },
        // TODO: replace any types
        findUserByEmail: async (root: any, args: any) => {
            const { email } = args;
            return Users.findUnique({ where: { email } });
        },
    },

    User: {
        customAddress: (root: any) => {
            const { country, city, region, province } = root.Profile.Address;
            return {
                addressInLine: `${country}, ${region}, ${province}, ${city}`,
                addressObject: {
                    country,
                    city,
                    region,
                    province
                }
            }
        },
        mainData: (root: any) => {
            const { firstName, lastName, email, phone, whatsapp } = root;
            return {
                firstName,
                lastName,
                email,
                completeName: `${firstName} ${lastName}`,
                phone,
                whatsapp
            }
        }
    }
}


const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers,
})

export const serverInstance = server.listen().then(({ url }) => {
    console.log(`🚀  Graphql server ready at ${url}`);
})

