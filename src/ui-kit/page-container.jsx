import style from './page-container.module.css';

const PageContainer = ({children}) => {
    return (
        <div className={style.container}>
            {children}
        </div>
    )
}

export default PageContainer;