import foodQuery from '#query/food.js'
import Joi from 'joi'
import { v4 as uuidv4 } from 'uuid';
import path from 'path'

export default {
    ADD:async(req,res,next)=>{
        try{
            const { category_id,food_name,food_description,food_price } = req.body

            if(!req.files){
                throw new Error("Image is required!")
            }
            
            const mimetypes = ['image/png', 'image/svg+xml', 'image/jpeg']
            const { image  } = req.files
            
            if(!image){
                throw new Error("'image' is required!")
            }

            if(!mimetypes.includes(image.mimetype)){
                throw new Error("Upload a image .png .jpg .jpeg .svg")
            }

            const schema = Joi.object({ 
                category_id: Joi.required(),
                food_name: Joi.string().min(3).required(), 
                food_description: Joi.string().min(5).required(), 
                food_price: Joi.number().integer().required(),
              })

            const chek = schema.validate(req.body)
            
            if(chek.error){
                throw new Error(chek.error)
            }   

            let image_name = uuidv4()
            let type_image = image.name.split(".")
            type_image = type_image[type_image.length-1]
            image_name = image_name+"."+type_image

            const inserted = await req.fetch(foodQuery.insert,category_id
                ,food_name
                ,food_description
                ,food_price
                ,image_name)

            image.mv(path.join(process.cwd(), "images", image_name))
            
            return res 
            .status(200) 
            .json({ 
                status: 200, 
                data: [inserted], 
                message: "Succes inserted" 
            })

        }
        catch(err){
            return next(err)
        }        
    },
    GET:async(req,res,next)=>{
        try{
            const {food_id = "",search = "",category_id="",active = "",page=1,limit=10} = req.query

            const selected = await req.fetchAll(foodQuery.get,search,food_id,category_id,active,((page - 1) * limit),limit)

            return res 
            .status(200) 
            .json({ 
                status: 200, 
                data: selected, 
                message: "Succes selected" 
            })
        }
        catch(err){
            return next(err)
        }
    },
    UPDATE:(req,res,next)=>{
        try{
            const {  } = req.body
        }
        catch(err){
            return next(err)
        }
    }
}

