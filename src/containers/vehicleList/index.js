import React, { Component } from 'react'
import * as Api from "../../api/api"

export default class VehicleList extends Component {
constructor(props){
    super(props);
    this.state={
        customers:[]
    }
}

    componentDidMount(){
        this.getCustomers()
    }

    getCustomers = async ()=>{
        const data = await Api.getAllCustomers()
        this.setState({customers:data})
    }

    render() {
        return (
            <div>
                {this.state.customers.map((prop,key)=>(
                    <div>{prop.name}</div>
                ))}
            </div>
        )
    }
}
