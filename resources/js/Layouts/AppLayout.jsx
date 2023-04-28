import 'bootstrap/dist/css/bootstrap.css';
import {Link, usePage} from "@inertiajs/react";

export default function AppLayout({children}) {

    const {auth}=usePage().props;

    const user=auth.user;


    return (
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Egzaminas 04-28</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link href={route("categories.index")} className="nav-link">Categories</Link>
                                </li>
                                {user != null && user.type == 0? <li className="nav-item">

                                    <Link className="nav-link active" href={route("books_category.index")} >Orders : <span className="badge text-bg-warning">{auth.count}</span></Link>

                                </li>:""}

                                {user != null?
                                    <li className="nav-item ">

                                        <Link className="nav-link  " href={route("category_book.myBooks",user.id)} >My Orders</Link>

                                    </li>:""}
                            </ul>
                        </div>
                        {user==null ?
                            <div className="float-end">

                                <Link className="btn btn-outline-dark mr-3 "  href={ route("login")} >Log In</Link>
                                &nbsp;


                                <Link className="btn btn-outline-info "  href={ route("register")} >Register</Link>

                            </div>
                            :


                            <div className="float-end">
                                <span >Welcome, <b>{user.name} ({user.type==1?"Admin":"User"})</b> </span>
                                <Link className="btn btn-outline-warning " href={route('logout')} method="post" as="button">Log Out</Link>

                            </div>
                        }

                        <div className="float-end">

                            &nbsp;

                        </div>
                        <div className="float-end">

                        </div>

                    </div>
                </nav>
                {children}
            </div>
        </div>
    );
}
