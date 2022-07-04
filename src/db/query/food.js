
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
    `,
    findFood: `
        select * from foods where food_id::text = $1
    `,
    update:`
        update foods as f set
        category_id=(
            case
                when length($1)>0 then $1::uuid
                else f.category_id
            end
        ),
        food_name = (
            case
                when length($2)>0 then $2
                else f.food_name
            end
        ),
        food_description = (
            case
                when length($3)>0 then $3
                else f.food_description
            end
        ),
        food_price = (
            case
                when $4>0 then $4
                else f.food_price
            end
        ),
        is_active = (
            case
                when length($5)>0 then $5::boolean
                else f.is_active
            end
        ),
        rate = (
            case
                when $6>0 then $6
                else f.rate
            end
        )

        where f.food_id::text=$7 returning *
    `,
    delete:`
    delete from foods where food_id=$1 returning *
    `
    }
