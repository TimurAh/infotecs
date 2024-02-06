import { useEffect, useState, useRef, useCallback } from 'react';
import UserOutput from "./userOutput";

const Table = () => {
	const [users,setUsers] = useState([]);
	const [searchValueParams,setSearchValueParams] = useState("");
	const [searchKeyParams,setSearchKeyParams] = useState("firstName");
	const [tableHeight, setTableHeight] = useState("auto");
	const [tableWight, setTableWight] = useState("auto");
	const [activeIndex, setActiveIndex] = useState(null);
	const tableElement = useRef(null);
	useEffect(()=>{
		loadAllUsers();
	},[])
	
	useEffect(() => {
		setTableHeight(tableElement.current.offsetHeight);

	}, [loadAllUsers,clickButtonSearch]);

	useEffect(() => {
		if (activeIndex !== null) {
		  window.addEventListener('mousemove', mouseMove);
		  window.addEventListener('mouseup', mouseUp);
		}
	  
		return () => {
		  removeListeners();
		}
	  }, [activeIndex]);
	const headers = ["Фио", "Возвраст", "Пол", "Номер Телефона", "Адресс"];
	const columns = createHeaders(headers);
	const searchKeysName=[
		["firstName","Имя"],["lastName","Фамилия"],["maidenName","Отчетсво"],["age","Возраст"],["gender","Пол"],["phone","Телефон"],["address.address","Улица"],["address.city","Город"]
	];
	const minCellWidth = 40;
	const maxTableWidth = 1200;
	const mouseMove = useCallback((e) => {
		
		
		
		const gridColumns = columns.map((col, i) => {
		  if (i === activeIndex) {
			let tableResizeWight=0;
			columns.map((col)=>(
					tableResizeWight+=col.ref.current.offsetWidth
			))
			let width = e.clientX - col.ref.current.offsetLeft;
			tableResizeWight=tableResizeWight-col.ref.current.offsetWidth+width //ширина таблицы после изменения ширины ячейки
			console.log(tableResizeWight)
			if (width >= minCellWidth && tableResizeWight<=maxTableWidth) {//проверка на минимальную ширину ячейки и максимальную ширину таблицы
			return `${width}px`;
			}
			// }
		  }

		  return `${col.ref.current.offsetWidth}px`;
		});
	
		// ?
		tableElement.current.style.gridTemplateColumns =`${gridColumns.join(' ')}`;
	}, [activeIndex, columns, minCellWidth]);

	const mouseUp = useCallback(() => {
		setActiveIndex(null);
		removeListeners();
	}, [setActiveIndex]);
	const removeListeners = useCallback(() => {
		window.removeEventListener('mousemove', mouseMove);
		window.removeEventListener('mouseup', removeListeners);
	}, [mouseMove]);


		return( 
		<main>
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
								<UserOutput key={user.id} user={user}/>
							))
						}
					</tbody>
				</table>
			</div>
			<div id="search">
				
				<select onChange={event => setSearchKeyParams(event.target.value)}>
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