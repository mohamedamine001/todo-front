import React, { Component,useState,useEffect }from "react";
import {Redirect,useHistory,useParams} from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";

export default function Update(props) {
	
	const [isLoading, setIsLoading] = useState(true);
	const [isFailed, setIsFailed] = useState(false);
	const history = useHistory()
	const [data, setData] = useState({
			title:"",
			description:"",
	});
	
	
	const token = localStorage.getItem("token");	
	const { id } = useParams() 
	const config = {
		headers: {
		  'Authorization': 'Bearer ' + token
		}
	  }
	  
	/* Fetch TODO */
		const fetchTodo = () => {
				setIsLoading(true)
				
				axios.get('http://127.0.0.1:8000/api/user/todos/'+id,config)
					.then((res) => {
						
						const todo = res.data.data
						console.log(todo)
						setData(todo)
						setIsLoading(false)
					})
					.catch((err) => {
						console.log(err);
						setIsFailed(true)
						setIsLoading(false)
					})
			}

		useEffect(() => {
			fetchTodo()
		}, []);	
	  
	
	/* Submit */
	function handleSubmit(e){
		e.preventDefault();
		axios.put('http://127.0.0.1:8000/api/user/todos/'+id,data,config)
			 .then( res => {
				/*setTitre('');
				setDescription('');*/
				if(res.data.status ==="success"){
					console.log(res);
					alert('success! updated successfully')
					history.push('/todo')
				}else{
					alert(JSON.stringify(res.data.validation_errors))
				}
				
			 })
			 .catch( err => {
				console.log(err);
			 })
	};
	/* Handle Input change */
	function handle(e){
		const newdata = {...data}
		newdata[e.target.id]=e.target.value
		setData(newdata)
		console.log(data);
	}
	
	 
	return (
		<>
		<Header />
{!id || isFailed ? (
<Redirect to='/' />)
:(
	<div className="container">
	<div className="row justify-content-md-center">
		<div className="col-md-8 ml-auto mr-auto text-center mt-5">
			<h3 className="title">Update Todo</h3>
		</div>
	</div>
	<div className="row justify-content-md-center">
		<div className="col-md-6">
		
			<form className='p-3' onSubmit={handleSubmit}> 
			<div className="card-body">	
				
				<div className="form-group">
					<label>Titre</label>
					<input type="text" className="form-control" required id="title" name="title"  placeholder="Titre ..."
						value={data.title}
						onChange={e => handle(e)}/>
				</div>
				<div className="form-group">
					<label>Description</label>
					<input type="text" className="form-control" required id="description" name="description" placeholder="Description ..."
						value={data.description}
						onChange={e => handle(e)}/>
				</div>
				
				
				<div className="form-group mt-2 text-center">
					<button className="btn btn-info text-white btn-block ml-auto">Update</button>
				</div>
			</div>
			</form>
		</div>
		
	</div></div>
	)}
		</>
)
}