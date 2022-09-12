import React from 'react';
import Button from "../../../Button";

export default function PublishModal(props) {
    return (
        <div id='publish-success-modal' className={`${props.class}`}>
            <div id='modal-content' className=''>
                <h4 className='font-bold text-2xl text-center my-5'>Congratulations</h4>

                <p className='text-center mb-5 font-bold' id='message'>
                    Your loan offer has been published
                </p>

                <div id='modal-buttons' className='flex justify-center pr-5'>
                    <Button
                        title='View offers'
                        link='/client/dashboard'
                        buttonClass='view-orders mr-5  rounded w-full'
                    />
                </div>
            </div>
        </div>
    )
}
