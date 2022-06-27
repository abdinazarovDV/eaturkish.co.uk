export default {
    add:`
        insert into category(category_name) values($1) returning *
    `,

    delete:`delete from category where category_id::text=$1 returning *`,

    get:`select * from category where case 
    when length($1)>0 then category_id::text=$1 
        else true 
    end and 
    case 
        when length($2) > 0 then category_name ilike concat('%', $2, '%') 
        else true 
    end order by category_id offset $3 limit $4`,

    update:`
    update category as c set
        category_name = (
            case
                when length($2)>0 then $2 
                else c.category_name
            end
            )

        where category_id::text = $1 
        returning *`
}