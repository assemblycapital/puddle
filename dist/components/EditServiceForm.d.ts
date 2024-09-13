import { default as React } from 'react';
import { Service, ServiceEditOptions } from '..';

interface EditServiceFormProps {
    service: Service;
    onSubmit: (options: ServiceEditOptions) => void;
    availablePeers: string[];
}
declare const EditServiceForm: React.FC<EditServiceFormProps>;
export default EditServiceForm;
