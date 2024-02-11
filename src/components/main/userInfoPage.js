const UserInfoPage = ({user=null,active,setActive}) =>{
    const infoKeysName=[
		["firstName","Имя"],["lastName","Фамилия"],["maidenName","Отчетсво"],["age","Возраст"],["phone","Телефон"],["address.address","Улица"],["address.city","Город"],["height","Рост"],["weight","Вес"],["email","Email"]
	];
if(user!==null){
        console.log(user);
        return(
            //закрывается, если кликнуть на темную часть, но не реагирует, если нажимаем на поле с информацией
            <div className={active ? "userInfoDiv active" : "userInfoDiv"} onClick={()=> setActive(false)}>
                <div id="info" onClick={e=>e.stopPropagation()}>
                    {
                    infoKeysName.map((element)=> (
                        <label key={element[0]}>{element[1]} пользователя: <label>{user[element[0]]}<br/></label></label>
                    ))
                    }
                </div>
            </div>
        )
    }
    console.log("net");
    return(
        <div className={active ? "userInfoDiv active" : "userInfoDiv"} onClick={()=> setActive(false)}>
            <div id="info" onClick={e=>e.stopPropagation()}></div>
        </div>
    )
}
export default UserInfoPage