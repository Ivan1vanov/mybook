import jwt from 'jsonwebtoken'

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[5]

        if(token) {
            const decodedData = jwt.verify(token, 'fvckY0u')

            req.userId = decodedData.id

        }

        next()

    } catch (error) {
        console.log(error)
    }
}