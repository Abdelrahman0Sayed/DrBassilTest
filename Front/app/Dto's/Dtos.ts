interface LoginRequest {
    email: string
    password: string
}
interface RegisterRequest {
    studentName: string,
    userName: string,
    email: string,
    password: string
}
interface AuthResponse {
    messages: string
    token: string
    expiresOn: Date
}
interface User {
    studentName: string
    email: string

}
interface UsersResponse {
    totalUsers: number
    users: User[]
}
interface Course {
    courseName: string,
    grade: number,
    type: string,
    courseImg64: string
}
interface CourseRequest {
    courseName: string,
    grade: string,
    courseType: string,
    tutorials: number,
    courseImg: string
}
interface CoursesResponse {
    totalCourses: number
    totalTutorials: number
    courses: CourseRequest[]
}
interface TutorialRequest{
    tutorialName: string,
    tutorialLink: string,
    courseName: string
}
interface TutorialResponse {
    lectureId: number,
    lectureName: string,
    url: string,
    courseId: number
}
interface getTutorialsResponse {
    
    courseName: string,
    courseType: string,
    totalLectures: number,
    tutorials: TutorialResponse[],
    courseImg: string
}
interface EditTutorialDto{
    currentCourseName: string,
    currentTutorialName: string,
    updatedTutorialName: string,
    updatedTutorailUrl: string
}
interface EditCourseDto{
    currentCourseName: string,
    updatedCourseName: string,
    updatedType: string,
    updatedGrade: number,
    updatedCourseImg: string
}
interface AddBookRequest{
    bookTitle: string,
    description: string,
    bookLink: string,
    chapeters: number,
    pages: number,
    bookImg: string
}
interface getBookResponse{
    bookId: number,
    url: string,
    title: string,
    description: string,
    coverImage: string,
    chapters: number,
    pages: number
}
interface BooksResponse{
    totalBooks: number,
    books: getBookResponse[]
}
interface EditBookDto{
    currentBookTitle: string,
    updatedBookTitle: string,
    updatedBookUrl: string,
    updatedDescription: string,
    updatedChapters: number,
    updatedPages: number,
    updatedBookImg: string
}
interface AddArticleRequest{
    articleTitle: string,
    articleUrl: string,
    description: string,
    articleImg: string
}
interface getArticleResponse{
    articleUrl: string,
    articleImg: string,
    title: string,
    description: string
}
interface ArticlesResponse{
    totalArticles: number,
    articles: getArticleResponse[]
}
interface EditArticleDto{
    currentArticleTitle: string,
    updatedArticleTitle: string,
    updatedArticleUrl: string,
    updatedDescription: string,
    updatedArticleImg: string
}