import TitleBar from '@/components/TitleBar'
import TextSeparate from '@/components/items/TextSeparate';
import ListUser from './components/ListUser';
import ListDocuments from './components/ListDocuments';
import InputData from './components/InputData';
import BCheckBox from './components/BCheckBox';
import InputDataACT from './components/InputDataACT';
import BTable from './components/BTable';
import BInputRadioButton from './components/BInputRadioButton';
import ListModal from './components/ListModal';
import ListButton from './components/ListButton';
import ListChart from './components/ListChart';
import ListPagination from './components/ListPagination';









const page = () => {
    return (
        <div>
            <TitleBar title='Example Template' subtitle='Template Management' />

            <TextSeparate title='Input / Field' />
            <InputData />

            <TextSeparate title='CheckBox' />
            <BCheckBox />

            <TextSeparate title='RadioButton' />
            <BInputRadioButton />

            <TextSeparate title='Auto COmplete' />
            <InputDataACT />

            <TextSeparate title='List Documents' />
            <ListDocuments />

            <TextSeparate title='List User' />
            <ListUser />

            <TextSeparate title='Table List' />
            <BTable />

            <TextSeparate title='Button' />
            <ListButton />

            <TextSeparate title='Pagination' />
            <ListPagination />

            <TextSeparate title='Modal / Popup' />
            <ListModal />

            <TextSeparate title='Chart' />
            <ListChart />



        </div>
    )
}

export default page
