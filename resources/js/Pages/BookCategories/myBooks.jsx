import {useState} from "react";
import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";

export default function Index({ auth,favs}){

    const favsList=[];


    const handleDelete=(event)=>{

        router.delete(route("books_category.destroy",event.target.value));
    }



    favs.forEach((fav)=>{



        favsList.push(<tr key={fav.id}>
            <td>{fav.users[0].name}</td>
            <td>{fav.hotels[0].name}</td>

            <td>
                <button className="btn btn-danger" onClick={handleDelete} value={fav.id}>Cancel Favorite</button >
            </td>

        </tr>)
    });



    return (
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Countries
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>

                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Book
                                </th>

                                <th >Actions</th>

                            </tr>
                            </thead>
                            <tbody>
                            {favsList}
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>




        </AppLayout>
    );
}
