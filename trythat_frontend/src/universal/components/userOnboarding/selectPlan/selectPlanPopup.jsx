import { CloseCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
import SelectPlanForm from './selectPlanForm';
const SelectPlanPopup = ({ open, closePopup }) => {
    return (
        <Modal
            onCancel={() => {
                closePopup();
            }}
            footer={null}
            width={600}
            closeIcon={<CloseCircleFilled className="closeIcon" />}
            open={open}
            centered
        >
            <div>
                <>
                    <div>
                        <SelectPlanForm description={'Select Plan'} closePopup={closePopup} />
                    </div>
                </>

            </div>
        </Modal>
    );
};

export default SelectPlanPopup;
