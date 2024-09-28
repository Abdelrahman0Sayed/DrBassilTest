
export class AdminService {
    apiUrl = 'http://localhost:5035/api'

    async getUsers(){
        try {
            const response = await fetch(`${this.apiUrl}/User/GetAllUsers`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            })
            const users : UsersResponse = await response.json()
            return users
        } catch (error) {
            console.log(error)
        }
    }
    async getCourses(){
        try {
            const response = await fetch(`${this.apiUrl}/Course/GetAllCourses`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            })
            const res : CoursesResponse = await response.json()
            return res
        }
        catch (error) {
            console.log(error)
        }
    }
    async addCourse(course: Course){
        try {
            const response = await fetch(`${this.apiUrl}/Course/AddCourse`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(course)
            })
            return response
        }
        catch (error) {
            console.log(error)
        }
    }
    async deleteCourse(courseName :string){
        try {
            const response = await fetch(`${this.apiUrl}/Course/DeleteCourse?CourseName=${courseName}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                }
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async addTutorial(tutorial: TutorialRequest){
        try {
            const response = await fetch(`${this.apiUrl}/Course/AddTutorial`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tutorial)
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async getTutorials(courseName: string){
        try {
            const response = await fetch(`${this.apiUrl}/Course/GetCourse?CourseName=${courseName}`, {
                method: 'Post',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                }
            })
            const res : getTutorialsResponse = await response.json()
            return res
        } catch (error) {
            console.log(error)
        }
    }
    async deleteTutorial(name: string){
        try {
            const response = await fetch(`${this.apiUrl}/Course/DeleteTutorial?TutorialName=${name}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                }
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async EditTutorial(dto: EditTutorialDto){
        try {
            const response = await fetch(`${this.apiUrl}/Course/EditTutorial`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dto)
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async EditCourse(course: EditCourseDto){
        try {
            const response = await fetch(`${this.apiUrl}/Course/EditCourse`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(course)
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async addBook(book: AddBookRequest){
        try{
            const response = await fetch(`${this.apiUrl}/Book/AddBook`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(book)
            })
            return response
        } catch (error) {
            console.log(error);
        }
    }
    async getBooks(){
        try {
            const response = await fetch(`${this.apiUrl}/Book/GetAllBooks`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },
            })
            const res : BooksResponse = await response.json()
            return res
        } catch (error) {
            console.log(error)
        }
    }
    async deleteBook(bookTitle: string){
        try {
            const response = await fetch(`${this.apiUrl}/Book/DeleteBook?BookName=${bookTitle}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                }
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async editBook(book: EditBookDto){
        try{
            const response = await fetch(`${this.apiUrl}/Book/EditBook`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(book)
            })
            return response
        } catch (error) {
            console.log(error);
        }
    }
    async addArticle(article: AddArticleRequest){
        try {
            const response = await fetch(`${this.apiUrl}/Article/AddArticle`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(article)
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async getArticles(){
        try {
            const response = await fetch(`${this.apiUrl}/Article/GetAllArticles`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },
            })
            const res : ArticlesResponse = await response.json()
            return res
        } catch (error) {
            console.log(error)
        }
    }
    async deleteArticle(articleTitle: string){
        try {
            const response = await fetch(`${this.apiUrl}/Article/DeleteArticle?ArticleTitle=${articleTitle}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                }
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async editArticle(article: EditArticleDto){
        try {
            const response = await fetch(`${this.apiUrl}/Article/EditArticle`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(article)
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
}