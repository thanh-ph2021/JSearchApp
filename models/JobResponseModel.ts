export interface JobResponseModel {
    employer_name: string
    employer_logo: string
    employer_website: string
    employer_company_type: string
    job_publisher: string
    job_id: string
    job_employment_type: string
    job_title: string
    job_apply_link: string
    job_apply_is_direct: boolean
    job_apply_quality_score: number
    apply_options: ApplyOptionModel[]
    job_description: string
    job_is_remote: boolean
    job_posted_at_timestamp: number
    job_posted_at_datetime_utc: string
    job_city: string
    job_state: string
    job_country: string
    job_latitude: number
    job_longitude: number
    job_benefits: string
    job_google_link: string
    job_offer_expiration_datetime_utc: string
    job_offer_expiration_timestamp: number
    job_required_experience: any[]
    job_required_skills: string
    job_required_education: any[]
    job_experience_in_place_of_education: boolean
    job_min_salary: string
    job_max_salary: string
    job_salary_currency: string
    job_salary_period: string
    job_highlights: JobHighlightsModel
    job_job_title: string
    job_posting_language: string
    job_onet_soc: string
    job_onet_job_zone: string
}

export interface JobHighlightsModel {
    Qualifications: string[],
    Responsibilities: string[]
}

export interface ApplyOptionModel {
    publisher: string
    apply_link: string
    is_direct: boolean
}