export interface EstimatedSalaryModel {
    location: string,
    job_title: string,
    publisher_name: string,
    publisher_link: string,
    min_salary: number,
    max_salary: number,
    median_salary: number,
    salary_period: string,
    salary_currency: string
}