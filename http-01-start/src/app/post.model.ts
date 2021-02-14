export interface Post { 
    title: string; 
    content: string;
    id?: string;//?:-> this is optional, we will get dynamically at run time.
}