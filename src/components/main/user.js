import React from 'react';

class User extends React.Component {
	user = this.props.user;
	render(){
		if(this.user!=null){
			// console.log("User "+this.user.age)
			return(
			<tr>
				<th>{this.user.lastName} {this.user.firstName} {this.user.maidenName}</th>
				<th>{this.user.age}</th>
				<th>{this.user.gender}</th>
				<th>{this.user.phone}</th>
				<th>{this.user.address.address},{this.user.address.city}</th>
			</tr>
			)
		}
	}
	
  }
export default User