import catQuery from '#query/category.js'


export default {
    ADD: async (req, res, next) => { 
        try { 
 
            const { category_name } = req.body; 
            if (!category_name) { 
                throw new Error("category_name is required") 
            } 
 
            if (category_name.length < 3 || category_name.length > 32) { 
                throw new Error("Max length 16 min length 3") 
            } 
 
            const added = await req.fetch(catQuery.add, category_name); 
 
            return res 
                .status(200) 
                .json({ 
                    status: 200, 
                    data: [added], 
                    message: "Succes" 
                }); 
        } 
        catch (error) { 
            return next(error) 
        } 
    },
    GET: async (req, res, next) => { 
 
        try { 
            const { category_id = "", search = "", page = 1, limit = 5 } = req.query 
 
            const selected = await req.fetchAll(catQuery.get, 
                category_id, search, ((page - 1) * limit), limit) 
 
            return res 
                .status(200) 
                .json({ 
                    status: 200, 
                    data: selected, 
                    message: "Succes" 
                }) 
        } 
        catch (error) { 
            return next(error) 
        } 
    },
    DELETE: async (req, res, next) => { 
 
        try { 
 
            const { category_id } = req.params 
 
            if (!category_id) { 
                throw new Error("category_id is required")
            }
 
            const deleted = await req.fetch(catQuery.delete, category_id)
            
            if(!deleted){
                throw new Error("There is no such category_id")
            }
 
            return res 
                .status(200) 
                .json({ 
                    status: 200, 
                    data: [deleted], 
                    message: "Succes" 
                }) 
 
        } catch (error) { 
            return next(error) 
        } 
    },
    UPDATE:async(req,res,next)=>{
        try{
            const { category_name = "",category_id } = req.body

            if(!category_id){
                throw new Error("category_id is required!")
            }
            
            if(category_name){
                if (category_name.length < 3 || category_name.length > 32) { 
                    throw new Error("Max length 16 min length 3") 
                }
            }

            const updated = await req.fetch(catQuery.update,category_id,category_name)

            if(!updated){
                throw new Error("There is no such category_id")
            }

            return res 
                .status(200) 
                .json({ 
                    status: 200, 
                    data: [updated], 
                    message: "Succesfuly updated" 
                })

        }
        catch(err){
            return next(err)
        }
    }
}