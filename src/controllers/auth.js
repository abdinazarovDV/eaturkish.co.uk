import generator from 'generate-password'
import options from '#config/options.js'
import sender from '#util/mailer.js'
import authQuery from '#query/auth.js'
import userQuery from '#query/user.js'
import jwt from '#util/jwt.js'

export default {
    registerFirstStep: async (req, res, next) => {
        try {
            const { userName, emailAddress, userPassword } = req.body

            if(!userName) throw new Error("No username")
            if(!emailAddress) throw new Error("No email address")
            if(!userPassword) throw new Error("No password")

            //validation email address
            if(!options.validEmailRegEx.test(emailAddress)) throw new Error("Invalid email address")

            //generation random password
            let password = generator.generate(options.generatorOption)

            //setup mail options
            options.mailOptions.to = emailAddress
            options.mailOptions.text = 'Registration code from eaturkish.co.uk'
            options.mailOptions.html = `<p>You registration code is >></p><b>${password}</b>`

            //check trying sending more than once
            const found = await req.fetch(authQuery.findTemp, emailAddress, "")
            if(found) throw new Error("Code already sent, try after 3 minutes")

            //sending to email address
            const isSended = await sender.transporter.sendMail(options.mailOptions)
            if(!isSended) throw new Error("Code didn't send")
            
            //inserting to temp table in 3 minutes
            const written = await req.fetch(authQuery.createTemp, password, emailAddress, userName, userPassword)

            //deleting after 3 minutes
            setTimeout( async () => {
                await req.fetch(authQuery.deleteTemp, written.tc_id)
            },  180_000)
            

            return res.json({
                status: 200,
                data: [{
                    emailAddress
                }],
                message: "Code sent to email address"
            })
        } catch (err) {
            return next(err)
        }
    },
    registerSecondStep: async (req, res, next) => {
        try {
            const { emailAddress, tempCode } = req.body

            if(!emailAddress) throw new Error("No emailAddress")
            if(!tempCode) throw new Error("No code")

            //check code 
            const isValid = await req.fetch(authQuery.findTemp, emailAddress, tempCode + "")

            if(!isValid) throw new Error("Invalid code")

            //inserting to user table
            const createdUser = await req.fetch(authQuery.createUser, isValid.user_first_name, isValid.email_address, isValid.user_password, "")

            //deleting from temprory_code table
            setTimeout( async () => {
                await req.fetch(authQuery.deleteTemp, isValid.tc_id)
            }, 0)

            return res.json({
                status: 200,
                data: [{
                    userName: createdUser.user_first_name,
                    emailAddress:  createdUser.user_email_address,
                    userPhone: createdUser.user_phone,
                    token: jwt.sign({
                        userId: createdUser.user_id,
                        agent: req.headers["user-agent"]
                    })
                }],
                message: "User successfully registered"
            })

        } catch (err) {
            return next(err)
        }
    },
    login: async (req, res, next) => {
        try {
            const { emailAddress, userPassword } = req.body

            if(!emailAddress || !userPassword) throw new Error("Please enter data(email address and password)")

            const isValid = await req.fetch(authQuery.findUser, emailAddress, userPassword)
            if(!isValid) throw new Error("Email address or password is wrong")

            return res.json({
                status: 200,
                data: [{
                    userFirstName: isValid.user_first_name,
                    userLastName: isValid.user_last_name,
                    emailAddress: isValid.user_email_address,
                    userPhone: isValid.user_phone,
                    token: jwt.sign({
                        userId: isValid.user_id,
                        agent: req.headers["user-agent"]
                    })
                }]
            })

        } catch (err) {
            return next(err)
        }
    },
    resetPasswordFirstStep: async (req, res, next) => {
        try {
            const { emailAddress } = req.body
            if(!emailAddress) throw new Error("No email address")
            //validation email address
            if(!options.validEmailRegEx.test(emailAddress)) throw new Error("Invalid email address")

            //generation random password
            let password = generator.generate(options.generatorOption)

            //setup mail options
            options.mailOptions.to = emailAddress
            options.mailOptions.text = 'Registration code from eaturkish.co.uk'
            options.mailOptions.html = `<p>You registration code is >></p><b>${password}</b>`

            //check trying sending more than once
            const found = await req.fetch(authQuery.findTemp, emailAddress, "")
            if(found) throw new Error("Code already sent, try after 3 minutes")

             //sending to email address
             const isSended = await sender.transporter.sendMail(options.mailOptions)
             if(!isSended) throw new Error("Code didn't send")
             
             //inserting to temp table in 3 minutes
             const written = await req.fetch(authQuery.createTemp, password, emailAddress, "", "")
 
             //deleting after 3 minutes
             setTimeout( async () => {
                 await req.fetch(authQuery.deleteTemp, written.tc_id)
             },  180_000)
             
 
             return res.json({
                 status: 200,
                 data: [{
                     emailAddress
                 }],
                 message: "Code sent to email address"
             })

        } catch (err) {
            return next(err)
        }
    },
    resetPasswordSecondStep: async (req, res, next) => {
        try {
            const { emailAddress, tempCode } = req.body
            if(!emailAddress) throw new Error("No emailAddress")
            if(!tempCode) throw new Error("No code")

            //check code 
            const isValid = await req.fetch(authQuery.findTemp, emailAddress, tempCode + "")
            if(!isValid) throw new Error("Invalid code")

            const foundUser = await req.fetch(authQuery.findUser, emailAddress, "")
            if(!foundUser) throw new Error("Invalid user")

            setTimeout( async () => {
                await req.fetch(authQuery.deleteTemp, isValid.tc_id)
            }, 0)

            return res.json({
                status: 200,
                data: [{
                    token: jwt.sign({ 
                        emailAddress: foundUser.user_email_address,
                        agent: req.headers["user-agent"] 
                    })
                }],
                message: "Email verified"
            })
        } catch (err) {
            return next(err)
        }
    },
    resetPasswordFinallyStep: async (req, res, next) => {
        try {

            const { token } = req.headers
            if(!token) throw new Error("Invalid token to reset password")

            const { emailAddress } = jwt.verify(token)
            
            const { newPassword } = req.body
            if(!newPassword) throw new Error("No password")

            const result = await req.fetch(userQuery.editUser, "", "", "", "", newPassword, "", emailAddress)
            if(!result) throw new Error("Passwors didn't reset")

            return res.json({
                status: 200,
                data: [result],
                message: "Passwors successfully reset"
            })
        } catch (err) {
            return next(err)
        }
    },
    adminLogin: async (req, res, next) => {
        try {
            const { name, password } = req.body
            if(!name || !password) throw new Error("name and password is required")

            const admin = await req.fetch(authQuery.adminLogin, name, password)
            if(!admin) throw new Error("Admin not found with given name and password")

            return res.json({
                status: 200,
                data: [{
                    admin_name: admin.admin_name,
                    token: jwt.sign({
                        adminId: admin.admin_id,
                        agent: req.headers["user-agent"]
                    })
                }]
            })
        } catch (err) {
            return next(err)
        }
    }
}