import React, { Component,useState,useEffect }from "react";
import { useHistory, Redirect} from "react-router-dom";
import axios from "axios";
import Update from '../components/Update';
 
// reactstrap components
import {
	Button,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col,
} from 'reactstrap'




export default function Todo(props) {
	const history = useHistory()
	function Update(id){
		console.log(id);
		history.push('/update/'+id);
	}
	
	const [Titre, setTitre] = useState('');
	const [Description, setDescription]  = useState('');
	const token = localStorage.getItem("token");
	
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState([]);
	const [isFailed, setIsFailed] = useState(false);
	
	const config = {
		headers: {
		  'Authorization': 'Bearer ' + token
		}
	  }
	  
	/* Fetch TODOS */
		/*const fetchTodos = () => {*/
		function fetchTodos(){
				setIsLoading(true)
				console.log(config)
				axios.get('http://127.0.0.1:8000/api/user/todos',config)
					.then((res) => {
						
						//const posts = res.data.data.slice(0, 3)
						const todos = res.data.data
						console.log(todos);
						setTodos(todos)
						setIsLoading(false)
					})
					.catch((err) => {
						console.log(err);
						setIsFailed(true)
						setIsLoading(false)
					})
			}

		useEffect(() => {
			fetchTodos()
		}, []);	
	  
	
	/* Submit */
	const handleSubmit = e =>{
		e.preventDefault();
		
		
		const data = {
			title: Titre,
			description : Description,
			
		};
		
		axios.post('http://127.0.0.1:8000/api/user/todos',data,config)
			 .then( res => {
				setTitre('');
				setDescription('');
				console.log(res);
				//reset form inputs
				e.target.reset();
				fetchTodos()

			 })
			 .catch( err => {
				console.log(err);
			 })
	};
	/* Delete */
	
	function Delete(id){
		console.log(id);
		axios.delete('http://127.0.0.1:8000/api/user/todos/'+id,config)
			 .then( res => {
				if(res.data.status ==="success"){
					const alldata = todos.filter(todo=>todo.id !== id)
					setTodos(alldata)
				}else{
					alert('error')
				}
			 })
			 .catch( err => {
				console.log(err);
			 })
	}
	

	return (
		<>
	<div className="container">
	<div className="row justify-content-md-center">
		<div className="col-md-8 ml-auto mr-auto text-center mt-5">
			<h3 className="title">Todo</h3>
		</div>
	</div>
	<div className="row justify-content-md-center">
		<div className="col-md-6">
		
			<form className='p-3' onSubmit={handleSubmit}> 
			<div className="card-body">	
				
				<div className="form-group">
					<label>Titre</label>
					<input type="text" className="form-control" id="titre" name="titre" required placeholder="Titre ..."
						onChange={e => setTitre(e.target.value)}/>
				</div>
				<div className="form-group">
					<label>Description</label>
					<input type="text" className="form-control" id="description" name="description" required placeholder="Description ..."
						onChange={e => setDescription(e.target.value)}/>
				</div>
				
				
				<div className="form-group mt-2 text-center">
					<button className="btn btn-danger btn-block ml-auto">Ajouter</button>
				</div>
			</div>
			</form>
		</div>
		
		
		<h3> Todo List </h3>
		{todos.map((todo) => (
			<li className="list-group-item d-flex text-capitalize justify-content-between my-2" key={todo.id}>
				  <div className="d-flex">
					<b style={{ marginRight: "100px" }}>{todo.title}</b>
					<h6>{todo.description}</h6>
				  </div>
				  <div className="todo-icons">
					<button className="btn mx-2 btn-success" onClick={()=>Update(todo.id)}>
					  Edit
					</button>
					<button className="btn mx-2 btn-danger" onClick={()=>Delete(todo.id)}>
					  Delete
					</button>
				  </div>
			</li>
		))}
		
	</div></div>
		</>
	)
}