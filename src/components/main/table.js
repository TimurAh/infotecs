import { useEffect, useState, useRef, useCallback } from 'react';
import UserOutput from "./userOutput";
import UserInfoPage from './userInfoPage';

const Table = () => {
	//для показа всплывающего окна
	const [activeInfoPage,setActiveInfoPage]=useState(false)
	//для вывода информации о юзере
	const [userForInfoPage,setUserForInfoPage] = useState(null);
	//для вывода списка
	const [users,setUsers] = useState([]);
	//для поиска по таблице
	const [searchValueParams,setSearchValueParams] = useState("");
	const [searchKeyParams,setSearchKeyParams] = useState("firstName");
	//для растягивания столбцов
	const [tableHeight, setTableHeight] = useState("auto");
	const [activeIndex, setActiveIndex] = useState(null);
	const tableElement = useRef(null);
	//загрузка пользователей
	useEffect(()=>{
		loadAllUsers();
	},[])
	//установка метки для растягивания колонок 
	useEffect(() => {
		setTableHeight(tableElement.current.offsetHeight);

	}, [loadAllUsers,clickButtonSearch]);
	//слушатели для растягивания
	useEffect(() => {
		if (activeIndex !== null) {
		  window.addEventListener('mousemove', mouseMove);
		  window.addEventListener('mouseup', mouseUp);
		} 
		return () => {
		  removeListeners();
		}
// eslint-disable-next-line
 	}, [activeIndex]);
	 const mouseUp = useCallback(() => {
		setActiveIndex(null);
		removeListeners();
// eslint-disable-next-line
	}, [setActiveIndex]);
	const minCellWidth = 50;//минимальная длинна ячейки при растягиваниии
	const maxTableWidth = 1200;//максимальная ширина таблицы
	const headers = ["Фио", "Возвраст", "Пол", "Номер Телефона", "Адресс"];//список названия столбцов
	const columns = createHeaders(headers);// массив стобцов с ссылками
	const mouseMove = useCallback((e) => {
		const gridColumns = columns.map((col, i) => {
		  if (i === activeIndex) {
			let tableResizeWidth=0;
			columns.map((col)=>(
					tableResizeWidth+=col.ref.current.offsetWidth
			))
			let width = e.clientX - col.ref.current.offsetLeft;
			tableResizeWidth=tableResizeWidth-col.ref.current.offsetWidth+width //ширина таблицы после изменения ширины ячейки
			console.log(tableResizeWidth)
			if (width >= minCellWidth && tableResizeWidth<=maxTableWidth) {//проверка на минимальную ширину ячейки и максимальную ширину таблицы
			return `${width}px`;
			}
		  }
		  return `${col.ref.current.offsetWidth}px`;
		});
		tableElement.current.style.gridTemplateColumns =`${gridColumns.join(' ')}`;
	}, [activeIndex, columns, minCellWidth]);
	//удаление слушателей
	const removeListeners = useCallback(() => {
		window.removeEventListener('mousemove', mouseMove);
		window.removeEventListener('mouseup', removeListeners);
	}, [mouseMove]);

	//список ключей для селекта
	const searchKeysName=[
		["firstName","Имя"],["lastName","Фамилия"],["maidenName","Отчетсво"],["age","Возраст"],["gender","Пол"],["phone","Телефон"],["address.address","Улица"],["address.city","Город"]
	];
	
		return( 
		<main>
			<UserInfoPage user={userForInfoPage} active={activeInfoPage} setActive={setActiveInfoPage}/>
			<div className="table-wrapper">
				<table id="jsTable" ref={ tableElement }>
					<thead>
						<tr>
							{
								columns.map(({ ref, text }, i) => (
									<th ref={ref} key={text}>
										<span>{text}</span>
										<div
											style={{ height:tableHeight }}
											onMouseDown={() => mouseDown(i)}
											className={`resize-handle ${activeIndex === i ? 'active' : 'idle'}`}
										/>
									</th>
								  ))
							}
						</tr>
					</thead>
					<tbody>
						{
							users.map((user)=> (
								<UserOutput setUserForInfoPage={setUserForInfoPage} activeInfoPage={activeInfoPage} setActiveInfoPage={setActiveInfoPage} key={user.id} user={user}/>
							))
						}
					</tbody>
				</table>
			</div>
			<div id="search">
				
				<select  title="search" onChange={event => setSearchKeyParams(event.target.value)}>
					{
						searchKeysName.map((element)=> (
								<option value={element[0]} key={element[0]}>{element[1]} </option>
						))
					}
				</select>
				<input placeholder="Введите текст" onChange={event =>setSearchValueParams(event.target.value)}></input>
				
			</div>
			<button onClick={()=>console.log(clickButtonSearch())}>Поиск</button>
			<button onClick={()=>loadAllUsers()}>Отмена</button>
		</main>
		)
// eslint-disable-next-line
	function clickButtonSearch(){
		let url = 'https://dummyjson.com/users/filter?';
		url = url + "key=" + searchKeyParams + "&value=" +  searchValueParams;
		fetch(url)
			.then(res => res.json())
			.then(data => setUsers(data.users));
	}
// eslint-disable-next-line
	function loadAllUsers(){
		fetch('https://dummyjson.com/users')
		.then(res => res.json())
		.then(data =>setUsers(data.users));
	}
	function mouseDown (index){
		setActiveIndex(index);
	  }
}
const createHeaders = (headers) => {
  return headers.map((item) => ({
    text: item,
    ref: useRef(),
  }));
}

export default Table
