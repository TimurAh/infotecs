import React, { useEffect, useState } from 'react';
import UserOutput from "./user";
import { useSearchParams } from "react-router-dom";

const Table = () => {
	const [users,setUsers] = useState([]);
	const [searchValueParams,setSearchValueParams] = useState("");
	const [searchKeyParams,setSearchKeyParams] = useState("firstName");

	useEffect(()=>{
		loadAllUsers();
	},[])

	

	
		return( 
		<main>
			<table id="jsTable">
				<thead>
					<tr>
						<th>ФИО</th>
						<th>Возраст</th>
						<th>Пол</th>
						<th>Номер Телефона</th>
						<th>Адрес</th>
					</tr>
				</thead>
				<tbody>
					{
						users.map((user)=> (
							<UserOutput key={user.id} user={user}/>
						))
					}
				</tbody>
			</table>
			<div id="search">
				<select onChange={event => setSearchKeyParams(event.target.value)}>
					<option value="firstName" >Имя</option>
					<option value="lastName">Фамилия</option>
					<option value="maidenName">Отчество</option>
					<option value="age">Возраст</option>
					<option value="gender">Пол</option>
					<option value="phone">Телефон</option>
					<option value="address.address">Улица</option>
					<option value="address.city">Город</option>
				</select>
				<input placeholder="Введите текст" onChange={event =>setSearchValueParams(event.target.value)}></input>
				
			</div>
			<button onClick={()=>console.log(clickButtonSearch())}>Поиск</button>
			<button onClick={()=>loadAllUsers()}>Отмена</button>
		</main>
		)

	function clickButtonSearch(){
		let url = 'https://dummyjson.com/users/filter?';
		url = url + "key=" + searchKeyParams + "&value=" +  searchValueParams;
		fetch(url)
			.then(res => res.json())
			.then(data => setUsers(data.users));
	}
	function loadAllUsers(){
		fetch('https://dummyjson.com/users')
		.then(res => res.json())
		.then(data =>setUsers(data.users));
	}
}

export default Table