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
    UPDATE:async(req,res,next)=>{
        try{
            const { food_id,category_id="",food_name="",food_description="",food_price=0,is_active="",rate=0 } = req.body
            
            if(!food_id){
                throw new Error("'food_id' is required! ")
            }

            if(isNaN(food_price)){
                throw new Error("'food_price' must be a number!")
            }

            if(isNaN(rate)){
                throw new Error("'rate' must be a number!")
            }

            if(is_active){
                if(!(is_active=='true' || is_active=='false')){
                    throw new Error("'is_active' must be 'false' or 'true'")
                }
            }

            if(req.files){
                var { image } = req.files

                let mTypes = ['image/png', 'image/svg+xml', 'image/jpeg']

                if(!image){
                    throw new Error("Upload image with key 'image'")
                }

                if(!mTypes.includes(image.mimetype)) {
                    throw new Error("Please upload an image!")
                }
            }

            let updated = await req.fetch(foodQuery.update,category_id
                ,food_name
                ,food_description
                ,food_price
                ,is_active
                ,rate,food_id)

            if(image){
                image.mv(path.join(process.cwd(), "images", updated.food_picture))
            }

            return res 
            .status(200) 
            .json({ 
                status: 200, 
                data: [updated], 
                message: "Succes updated" 
            })

        }
        catch(err){
            return next(err)
        }
    },
    DELETE:async(req,res,next)=>{
        try{
            const { food_id } = req.params
            
            if(!food_id){
                throw new Error("'food_id' is required! ")
            }

            const deleted = await req.fetch(foodQuery.delete,food_id)

            if(!deleted){
                throw new Error("No food like this 'food_id'")
            }

            return res 
            .status(200) 
            .json({ 
                status: 200, 
                data: [deleted], 
                message: "Succes updated" 
            })

        }
        catch(err){
            return next(err)
        }
    }
}

