import React from 'react';
import Button from "../../../Button";

export default function ListModal(props) {
    const { state, setState } = props.listState;

    return (
        <div id='save-list-modal' className={`h-60 ${props.class}`}>
            <div id='modal-content' className=''>
                <h4 className='font-bold text-2xl self-start my-5'>New list</h4>

                <div className='grid grid-cols-2 gap-4 mb-10'>
                    <div className='col-span-2'>
                        <input
                            type='text'
                            name='favouriteListName'
                            value={state.favouriteListName}
                            onChange={(e) =>
                                setState((state) => ({
                                    ...state,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            placeholder='Title'
                            className='w-full border-l-0 border-t-0 border-r-0 focus:border-white'
                        />
                    </div>
                    <div className='col-span-2'>
                        <input
                            type='text'
                            name='favouriteListDescription'
                            value={state.favouriteListDescription}
                            onChange={(e) =>
                                setState((state) => ({
                                    ...state,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            placeholder='Description (optional)'
                            className='w-full border-l-0 border-t-0 border-r-0 focus:border-white'
                        />
                    </div>
                </div>

                <div id='modal-buttons' className='flex justify-end pr-5'>
                    <Button
                        title='Cancel'
                        buttonClass='cancel mr-5'
                        handleClick={props.removeModal}
                    />

                    <Button title='Create' buttonClass='create' handleClick={props.saveListFunc} />
                </div>
            </div>
        </div>
    )
}
