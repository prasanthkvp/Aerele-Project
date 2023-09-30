import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Library } from './Components/Login/login';
import { LibrarianDashboard } from './Components/librarianDashboard/dashboard';
import { MemberManagement } from './Components/LibraryManagement/MemberManagement';
import { TransactionManagement } from './Components/LibraryManagement/TransactionManagement';
import { BookManagement } from './Components/librarianDashboard/BookManagement';
import { IssueBook } from './Components/LibraryManagement/IssueBook';
import { AddMember } from './Components/LibraryManagement/AddMember';
import { AddBook } from './Components/LibraryManagement/AddBook';
import { Updatemember } from './Components/LibraryManagement/updatemember';
import { Updatebook } from './Components/LibraryManagement/updatebook';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Library/>}/>
      <Route path='/Library' element={<Library/>}/>
      <Route path='/LibrarianDashboard/:id' element={<LibrarianDashboard/>}/>
      <Route path='/Members' element={<MemberManagement/>}/>
      <Route path='/Transaction' element={<TransactionManagement/>}/>
      <Route path='/Books' element={<BookManagement/>}/>
      <Route path='/IssueBook' element={<IssueBook/>}/>
      <Route path='/AddMember' element={<AddMember/>}/>
      <Route path='/AddBook' element={<AddBook/>}/>
      <Route path='/update/:memberid' element={<Updatemember/>}/>
      <Route path='/updatebooks/:bookid' element={<Updatebook/>}/>

      



    </Routes>
    </BrowserRouter>
  );
}
export default App;
