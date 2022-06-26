export default {
    createTemp: `
        insert into temprory_code (
            temp_code,
            email_address,
            user_first_name,
            user_password
        ) values ( $1, $2, $3, crypt($4, gen_salt('bf')) )
        returning *
    `,
    findTemp: `
        select
            *
        from temprory_code
        where 
            email_address = $1 
        and
            case
                when length($2) > 0 then temp_code::text = $2
                else true
            end
    `,
    deleteTemp: `
        delete from temprory_code
        where tc_id::text = $1
        returning *
    `,
    createUser: `
        insert into users (
            user_first_name,
            user_email_address,
            user_password,
            user_phone
        ) values ( $1, $2, $3, $4)
        returning *
    `,
    findUser: `
        select
            *
        from users
        where
            user_email_address = $1
        and
            case
                when length($2) > 0 then user_password = crypt($2, user_password)
                else true
            end
    `
}