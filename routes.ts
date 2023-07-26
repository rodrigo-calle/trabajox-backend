import { Express } from "express"
import careers from './apis/careers'
import labels from './apis/labels'
import users from './apis/users'
import profiles from './apis/profiles'
import califications from './apis/califications'
import posts from './apis/posts'
import contact from './apis/contacts'
import address from './apis/address'
import media from './apis/media'
import auth from './apis/auth'

const router = (app: Express) => {
    app.use('/users', users)
    app.use('/careers', careers)
    app.use('/labels', labels)
    app.use('/profiles', profiles)
    app.use('/califications', califications)
    app.use('/posts', posts)
    app.use('/contact', contact)
    app.use('/address', address)
    app.use('/media', media)
    app.use('/auth', auth)

}

export default router