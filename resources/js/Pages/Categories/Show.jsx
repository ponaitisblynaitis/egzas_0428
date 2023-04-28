import {useState} from "react";
import AppLayout from "@/Layouts/AppLayout";
import {Link, router, useForm} from "@inertiajs/react";
import Alert from "bootstrap/js/src/alert";

export default function Index({category,auth,fil,bookies}){




    const booksList=[];

    const handleDelete=(event)=>{
        router.delete(route("books.destroy",event.target.value));
    }

    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        })

    }




    (bookies!=null?bookies:category.books).forEach((book)=>{



        booksList.push(

            <tr key={book.id}>

                <td>{book.name}</td>
                <td>{book.isbn}</td>
                <td>{book.pages}</td>
                <td>{book.summary}</td>
                <td>{book.photo && <img alt="foto" width="200px" src={"/storage/books/"+book.photo} />}</td>


                {auth.user != null && auth.user.type == 1?
                    <td><Link className="btn btn-dark m-2" href={route('books.edit',book.id)}>Edit</Link >

                        <button className="btn btn-danger" onClick={handleDelete} value={book.id}>Delete</button > </td>
                    :""

                }

                <td ><Link className='btn btn-outline-info' href={route('books_category.store',[auth.user.id,hotel.id])}>Attend</Link ></td>








            </tr>)
    });



    const [order, setOrder]=useState({

        field:"isbn",
        dir:1
    });



    let books=bookies!=null?bookies:category.books

    books.sort(
        (a, b)=>{
            if(a[order.field]>b[order.field]){
                return 1* order.dir;
            }

            if(a[order.field]<b[order.field]){
                return -1*order.dir;
            }
            return 0
        }
    );
    const [filter,setFilter]=useState({
        name:fil.name,
        category_id:category.id

    });

    const filterChange=(event)=>{
        setFilter({
            ...filter,
            [event.target.id]:event.target.value
        })

    }

    const handleFilter=()=>{
        router.post(route("books.filter"),filter);
    }



    return (
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Book {books.name} category
                    </div>
                    <div className="card-body">
                        {auth.user != null && auth.user.type == 1 ?
                            <Link className="btn btn-success float-end" href={route("books.create",category.id)}>Add a New Book</Link>:""
                        }

                        <table className="table">
                            <thead>
                            <tr>
                                <th>
                                    <input type="text" id="name" className="form-control"  onChange={filterChange} value={filter.name}/>
                                </th>
                                <th><button className="btn btn-warning" onClick={handleFilter}>Search</button></th>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <th>
                                    <span onClick={ ()=>{setOrder({field:"isbn",dir:order.field=='isbn'&&order.dir==1?-1:1})}}>ISBN</span>
                                </th>

                                <th>Pages</th>
                                <th>Summary</th>
                                <th>Picture</th>
                                {auth.user != null && auth.user.type == 1?
                                    <th  className="">Actions</th>:""}
                                <th></th>



                            </tr>
                            </thead>
                            <tbody>
                            {booksList}
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>




        </AppLayout>
    );
}
