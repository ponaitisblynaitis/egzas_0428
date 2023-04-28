import AppLayout from "@/Layouts/AppLayout";

import {useState} from "react";
import {router, useForm} from "@inertiajs/react";

export default function Create(props){



    const {data,setData,errors,setError, clearErrors}=useForm(props.book)

    const [isDirtyField, setDirtyField]=useState({
        name:false,
        isbn:false,
        pages:false,
        summary:false

    })


    const validate=()=>{
        if(isDirtyField.name) {
            if (data.name.length >= 3) {
                clearErrors("name")
            } else {
                setError("name", "The name is a mandatory field and must not be shorter than 3 characters")
            }
        }

        if(isDirtyField.price) {
            if (data.isbn.length >= 3) {
                clearErrors("isbn")
            } else {
                setError("isbn", "The price is a required field and must not be shorter than 3 characters")
            }
        }

        if(isDirtyField.trip_time) {
            if (data.pages.length >= 3) {
                clearErrors("pages")
            } else {
                setError("pages", "Travel duration is a mandatory field and must not be shorter than 3 characters")
            }
        }

        if(isDirtyField.trip_time) {
            if (data.summary.length >= 3) {
                clearErrors("summary")
            } else {
                setError("summary", "Travel duration is a mandatory field and must not be shorter than 3 characters")
            }
        }
    }

    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        })
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        router.post( route("books.update", data.id),{
            ...data,
            _method:'put',
        });
    }
    const handleBlur=(event)=>{
        isDirtyField[event.target.id]=true;
        setDirtyField({
            ...isDirtyField,
            [event.target.id]:true
        });
        validate()

    }

    return(
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">Edit Books</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input className={"form-control "+(errors.name!=null?"is-invalid":"")} type="text" id="name" onChange={handleChange} onBlur={handleBlur} value={data.name}/>
                                <div className="invalid-feedback">
                                    {errors.name}
                                </div>
                            </div>


                            <div className="mb-3">
                                <label className="form-label">ISBN</label>
                                <input className={"form-control "+(errors.isbn!=null?"is-invalid":"")} type="text" id="isbn" onChange={handleChange} onBlur={handleBlur} value={data.isbn}/>
                                <div className="invalid-feedback">
                                    {errors.isbn}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Pages</label>
                                <input className={"form-control "+(errors.pages!=null?"is-invalid":"")} type="text" id="pages" onChange={handleChange} onBlur={handleBlur} value={data.pages}/>
                                <div className="invalid-feedback">
                                    {errors.pages}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Summary</label>
                                <input className={"form-control "+(errors.summary!=null?"is-invalid":"")} type="text" id="summary" onChange={handleChange} onBlur={handleBlur} value={data.summary}/>
                                <div className="invalid-feedback">
                                    {errors.summary}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Picture</label>
                                <input className="form-control" type="file" id="photo" onChange={(event)=>{
                                    setData({
                                        ...data,
                                        photo: event.target.files[0]
                                    })}
                                } />

                            </div>

                            <button className="btn btn-success">Update</button>
                        </form>

                    </div>
                </div>
            </div>




        </AppLayout>
    )
}
