import React, { useState, useEffect } from 'react';
import { TrixEditor } from "react-trix";
import "trix";
import "trix/dist/trix.css";
import { create, readAll, update } from "../models/documents";

const Editor = () => {
    let [data, setData] = useState('');
    const [docs, setDocs] = useState([]);
    const [currentDoc, setCurrentDoc] = useState({});
    const [title, setTitle] = useState('');

    useEffect(() => {
        (async () => {
            const allDocs = await readAll();
            setDocs(allDocs);
        })();
    }, [currentDoc]);

    let fetchDoc = () => {
        let selectedDocId = document.getElementById("selectDoc").value;
        let selectedDoc = docs[selectedDocId];

        setCurrentDoc(selectedDoc);

        if (selectedDoc !== undefined) {
            setEditorContent(selectedDoc);
        }
        document.getElementById("newForm").style.display = "none";
    };

    function setEditorContent(selectedDoc) {
        let element = document.querySelector("trix-editor");
        element.value = "";
        element.editor.insertHTML(selectedDoc.text);
    };

    function openForm() {
        document.getElementById("newForm").style.display = "block";
    };

    function closeForm() {
        document.getElementById("newForm").style.display = "none";
    };

    const setName = (event) => {
        setTitle(event.target.value);
    };

    const createObject = async (event) => {
        event.preventDefault();
        let newDoc = {};
        newDoc.text = data;
        newDoc.title = title;
        await create(newDoc.title, newDoc.text);
    };

    const updateObject = async () => {
        if (currentDoc === undefined) {
            alert("No file selected");
        } else {
            currentDoc.text = data;
            await update(currentDoc._id, currentDoc.title, currentDoc.text);
        }
    };

    let setEditorData = (event) => {
        setData(event);
    };

    return (
        <div className = "App">
            <div id = "trix-toolbar" class= "toolbar">
                <select id = "selectDoc" onChange = { fetchDoc } >
                    <option value = "-99" key = "0"> Open </option>
                    {docs.map((doc, index) => <option value = {index} key = {index}> {doc.title} </option>)}
                </select>
                <button class="button" onClick = {()=> openForm()     }> New  </button>
                <button class="button" onClick = {()=> updateObject() }> Save </button>
            </div>
            <div class="form-popup" id="newForm">
                <form class="form-container" onSubmit = { (event) => { createObject(event);} }>
                    <h1>New file</h1>
                    <label for="fname"><b>File name</b></label>
                    <input type="text" placeholder="Enter file name" name="fname"
                        value = { title } onChange = { (event) => { setName(event); } } required>
                    </input>
                    <button type="submit" class="btn">Create</button>
                    <button type="button" class="btn cancel" onClick = {()=> closeForm() }>Cancel</button>
                </form>
            </div>

            <TrixEditor id = "trixEditorContent" className = "trix-editor"
                onChange = { setEditorData }
                value = { data }
            />
        </div>
    )
}

export default Editor
