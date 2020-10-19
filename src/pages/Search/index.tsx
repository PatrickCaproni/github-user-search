import { User } from 'core/types/User';
import { makeRequest } from 'core/utils/request';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import ImageLoader from './components/Loaders/ImageLoader';
import InfoLoader from './components/Loaders/InfoLoader';
import './styles.css';

type FormState = {
    login: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement>;

const Search = () => {
    const [formData, setFormData] = useState<FormState>({
        login: ''
    });
    const [hide, setHide] = useState(true);

    const [userResponse, setUserResponse] = useState<User>();
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const payload = {
            ...formData,
        }
        setHide(false);
        setIsLoading(true);
        makeRequest({ url: `${formData.login}`, method: 'GET', data: payload })
            .then(user => setUserResponse(user.data))
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <>
            <div className="search-container">
                <div className="search-title">
                    <h4>
                        Encontre um perfil Github
                    </h4>
                    <form>
                        <div>
                            <input
                                value={formData.login}
                                name="login"
                                type="text"
                                className="form-control"
                                onChange={handleOnChange}
                                placeholder="Digite o login do usuário"
                            />
                        </div>
                        <div className="btn-container">
                            <button className="btn-icon" onClick={handleClick}>
                                <strong className="btn-icon-text">Encontrar</strong>
                            </button>

                        </div>
                    </form>
                </div>
            </div>
            {hide ? <div></div> : (
                <div className="search-result-container">
                    {isLoading ? <ImageLoader /> : (
                        <div className="img-container">
                            <img
                                src={userResponse?.avatar_url}
                                alt={userResponse?.login}
                                className="user-card-image"
                            />
                            <a href={userResponse?.html_url} target="_blank" rel="noopener noreferrer">
                                <div className="btn-container">
                                    <button className="btn-icon">
                                        <strong className="btn-icon-text">Ver Perfil</strong>
                                    </button>
                                </div>
                            </a>
                        </div>

                    )}
                    {isLoading ? <InfoLoader /> : (
                        <><div className="stats-box">
                            <div className="statistics-container">
                                <p className="statistics-text">
                                    Repositórios públicos: <span>{userResponse?.public_repos}</span>
                                </p>
                            </div>
                            <div className="statistics-container">
                                <p className="statistics-text">
                                    Seguidores: {userResponse?.followers}
                                </p>
                            </div>
                            <div className="statistics-container">
                                <p className="statistics-text">
                                    Seguindo: {userResponse?.following}
                                </p>
                            </div>
                        </div>
                            <div className="info-box">
                                <p className="info-title">
                                    Informações
                            </p>
                                <div className="info-container">
                                    <p className="info-text">
                                    <span className="info-subtitle">Empresa: </span> {userResponse?.company}
                                    </p>
                                </div>
                                <div className="info-container">
                                    <p className="info-text">
                                    <span className="info-subtitle">Website/Blog: </span> {userResponse?.blog}
                                    </p>
                                </div>
                                <div className="info-container">
                                    <p className="info-text">
                                    <span className="info-subtitle">Localidade: </span> {userResponse?.location}
                                    </p>
                                </div>
                                <div className="info-container">
                                    <p className="info-text">
                                       <span className="info-subtitle">Membro desde: </span> {dayjs(userResponse?.created_at).format('DD/MM/YYYY')}
                                    </p>
                                </div>
                            </div></>
                    )}
                </div>
            )}
        </>
    );
}
export default Search;