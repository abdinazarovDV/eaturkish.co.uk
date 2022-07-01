
export default {
    insert:`
        insert into foods( category_id,food_name,food_description,food_price,food_picture )
        values($1,$2,$3,$4,$5) returning *
    `,
    get:`
    select f.*,c.category_name from foods as f inner join category as c on
    c.category_id=f.category_id
    where
        case
            when length($1) > 0 then f.food_name ilike concat('%', $1, '%') 
            or f.food_description ilike concat('%', $1, '%')
        else true
        end and
        case 
            when length($2) > 0 then f.food_id::text = $2
            else true
        end and
        case 
            when length($3) > 0 then f.category_id::text = $3
            else true
        end and
        case 
            when length($4) > 0 then f.is_active::text = $4
            else true
        end
    order by f.created_at desc
    offset $5 limit $6
`}


// search + 
// food_id +
// category_id +
// is_active
