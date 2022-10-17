import React, {useState, useEffect, useRef} from 'react';

import {submitComment} from "../services";

const CommentsForm = ({slug}) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl = useRef();

    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem('nome');
        emailEl.current.value = window.localStorage.getItem('email');
    }, []);
    

    const handleCommentSubmission = () => {
        setError(false);

        const {value: comentario} = commentEl.current;
        const {value: nome} = nameEl.current;
        const {value: email} = emailEl.current;
        const {checked: storeData} = storeDataEl.current;

        if (!comentario || !nome || !email) {
            setError(true);
            return;
        }

        const commentObj = {nome, email, comentario, slug};

        if (storeData) {
            window.localStorage.setItem('nome', nome);
            window.localStorage.setItem('email', email);
        } else {
            window.localStorage.removeItem('nome', nome);
            window.localStorage.removeItem('email', email);
        }

        submitComment(commentObj)
            .then((res) => {
                setShowSuccessMessage(true);
                
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);
            })
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">Deixe um comentário</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea ref={commentEl} className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Comentário" name="comentario" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input type="text" ref={nameEl} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Nome" name="nome"/>
                <input type="text" ref={emailEl} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Email" name="email"/>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="container">
                    <input type="checkbox" ref={storeDataEl} id="storeData" name="storeData" value="true"/>
                    <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">Salvar meu email e nome para o próximo comentário</label>
                </div>
            </div>
            {error && <p className="text-xs text-red-500">Todos os campos são necessários.</p>}
            <div className="mt-8">
                <button type="button" onClick={handleCommentSubmission} className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer">
                    Postar comentário
                </button>
                {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comentário enviado para avaliação</span>}
            </div>
        </div>
    );
};

export default CommentsForm;
