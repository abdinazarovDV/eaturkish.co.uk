
export default {
    insert:`
        insert into foods( category_id,food_name,food_description,food_price,food_picture )
        values($1,$2,$3,$4,$5) returning *
    `
}