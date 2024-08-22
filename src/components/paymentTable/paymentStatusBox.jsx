import react from 'react'
import './paymentStatusBox.css'
import table_icon1 from './assets/table_icon1.png'
import dropdown_arrow from './assets/dropdown_arrow.png'

const PaymentStatusBox=()=>{
    return(
        <div className='paymentStatusBox'>
            <div className='table-top'>
                <p className='top-heading'>Payment Status</p>
                <div className="filters">
                    <div className='filter-1'><p>10</p><img src={dropdown_arrow}/></div>
                        <div className='filter-2'>
                        <div className='filter2-1'><img className='table_icon1' src={table_icon1} /><p>Past 15 days</p><img className='dropdown_arrow' src={dropdown_arrow} /></div>
                        <div className='filter-date'><p>17 Jan 2023</p>
                        <p>to</p>
                        <p>08 Feb 2024</p>
                        </div>
                </div></div>
                
            </div>
            <div className='table-content'>
                <table>
                    <tr>
                        <th><p>Name</p></th>
                        <th><p>Date & Time</p></th>
                        <th><p>Mobile No</p></th>
                        <th><p>Service</p></th>
                        <th><p>Final $</p></th>
                        <th><p>Status</p></th>
                    </tr>
                    <tr>
                        <td className='Cell'><div className='cell-icon'></div><p>Customer Name</p></td>
                        <td><p>24 jan 2024</p></td>
                        <td><p>8527081843</p></td>
                        <td><p>Press Release</p></td>
                        <td><p>₹22500</p></td>
                        <td><p className='Success'>Success</p></td>
                    </tr>
                    <tr>
                        <td className='Cell'><div className='cell-icon'></div><p>Customer Name</p></td>
                        <td><p>24 jan 2024</p></td>
                        <td><p>8527081843</p></td>
                        <td><p>Press Release</p></td>
                        <td><p>₹22500</p></td>
                        <td><p className='Failure'>Failure</p></td>
                    </tr>
                    <tr>
                        <td className='Cell'><div className='cell-icon'></div><p>Customer Name</p></td>
                        <td><p>24 jan 2024</p></td>
                        <td><p>8527081843</p></td>
                        <td><p>Press Release</p></td>
                        <td><p>₹22500</p></td>
                        <td><p className='Failure'>Failure</p></td>
                    </tr>
                    <tr>
                        <td className='Cell'><div className='cell-icon'></div><p>Customer Name</p></td>
                        <td><p>24 jan 2024</p></td>
                        <td><p>8527081843</p></td>
                        <td><p>Press Release</p></td>
                        <td><p>₹22500</p></td>
                        <td><p className='Success'>Success</p></td>
                    </tr>
                    <tr>
                        <td className='Cell'><div className='cell-icon'></div><p>Customer Name</p></td>
                        <td><p>24 jan 2024</p></td>
                        <td><p>8527081843</p></td>
                        <td><p>Press Release</p></td>
                        <td><p>₹22500</p></td>
                        <td><p className='Success'>Success</p></td>
                    </tr>
                </table>
            </div>
            <div className='table-end'>
                <div className='tableBtn'><p>Back</p></div>
                <p>Page 1 of 6</p>
                <div className='tableBtn'><p>Next</p></div>
            </div>
        </div>
    )
}

export default PaymentStatusBox;