import React from 'react';

class User extends React.Component {
	user = this.props.user;
	setActiveInfoPage=this.props.setActiveInfoPage;
	setUserForInfoPage=this.props.setUserForInfoPage;
	render(){
		if(this.user!=null){
			return(
			<tr onClick={()=>{this.setActiveInfoPage(true); this.setUserForInfoPage(this.user)}}>
				<td>{this.user.lastName} {this.user.firstName} {this.user.maidenName}</td>
				<td>{this.user.age}</td>
				<td>{this.user.gender}</td>
				<td>{this.user.phone}</td>
				<td>{this.user.address.address},{this.user.address.city}</td>
			</tr>
			)
		}
	}
	
  }
export default User