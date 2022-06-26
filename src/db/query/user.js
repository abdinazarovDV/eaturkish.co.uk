export default {
    editUser: `
        update users as u set
            user_first_name = (
                case
                    when length($2) > 0 then $2
                    else u.user_first_name
                end
            ),
            user_last_name = (
                case
                    when length($3) > 0 then $3
                    else u.user_last_name
                end
            ),
            user_email_address = (
                case
                    when length($4) > 0 then $4
                    else u.user_email_address
                end
            ),
            user_password = (
                case
                    when length($5) > 0 then $5
                    else u.user_password
                end
            ),
            user_phone = (
                case
                    when length($6) > 0 then $6
                    else u.user_phone
                end
            )
        where 
            case
                when length($1) > 0 then user_id::text = $1
                else true
            end
        and
            case
                when length($7) > 0 then user_email_address = $7
                else true
            end
        returning *
    `
}