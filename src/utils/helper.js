export function formatDate (timestamp){
    var date = new Date(timestamp);

    return (date.getHours()+
            ":"+date.getMinutes()+
            " | " +date.getDate()+
            "/"+(date.getMonth()+1)+
            "/"+date.getFullYear()
            )

}