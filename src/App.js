import React from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Table from './components/main/table';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return(
      <div className='name'>
        <Header />
        <Table />
        <Footer />
      </div>
    )
  }
}
export default App