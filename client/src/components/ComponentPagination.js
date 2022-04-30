import React, {useState} from 'react';
import {Pagination} from "react-bootstrap";
import "../styles/ComponentPagination.css"

function ComponentPagination({data, RenderComponent, dataLimit, fn}) {
    const [pages] = useState(Math.ceil(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    function goToFirstPage() {
        setCurrentPage(1);
    }

    function goToLastPage() {
        setCurrentPage(pages);
    }

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pages) * pages;
        return new Array(pages).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <section className="pagination">

            {/* show the RenderComponent */}
            <div>
                {getPaginatedData().map((d, idx) => (
                    <RenderComponent key={d._id ? d._id : idx} data={d} fn={fn}/>
                ))}
            </div>

            {/* show the pagination */}
            <Pagination className="pagination-number">
                <Pagination.First onClick={goToFirstPage} disabled={currentPage === 1}/>
                <Pagination.Prev onClick={goToPreviousPage} disabled={currentPage <= 1}/>
                {getPaginationGroup().map((item, index) => (
                    <Pagination.Item key={index} onClick={changePage} active={currentPage === item}>
                        {item}
                    </Pagination.Item>
                ))}
                {/*<Pagination.Ellipsis/>*/}
                <Pagination.Next onClick={goToNextPage} disabled={currentPage >= pages}/>
                <Pagination.Last onClick={goToLastPage} disabled={currentPage === pages}/>
            </Pagination>
        </section>
    );
}

export default ComponentPagination;