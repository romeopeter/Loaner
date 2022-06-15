import React from 'react';
import Button from "../../../Button";

export default function PublishModal(props) {
    return (
        <div id='publish-success-modal' className={`h-40 ${props.class}`}>
            <div id='modal-content' className=''>
                <h4 className='font-bold text-2xl text-center my-5'>Congratulations</h4>

                <p className='text-center mb-5 font-bold' id='message'>
                    Your loan offer has been published
                </p>

                <div id='modal-buttons' className='flex justify-center pr-5'>
                    <Button
                        title='View offers'
                        link='/broker/dashboard'
                        buttonClass='view-orders mr-5  rounded w-full'
                    />

                    {/* <Button title='View offer' link='/' buttonClass='go-home rounded create' /> */}
                </div>
            </div>
        </div>
    )
}
