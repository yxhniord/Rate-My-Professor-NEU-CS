import React, {useState} from 'react';
import {Pagination} from "react-bootstrap";

function ComponentPagination({data, RenderComponent, pageLimit, dataLimit}) {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

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
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <div>

            {/* show the RenderComponent */}
            <div className="dataContainer">
                {getPaginatedData().map((d, idx) => (
                    <RenderComponent key={idx} data={d}/>
                ))}
            </div>

            {/* show the pagination */}
            <div className="pagination">
                {/* previous button */}
                <button
                    onClick={goToPreviousPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    prev
                </button>

                {/* show page numbers */}
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                {/* next button */}
                <button
                    onClick={goToNextPage}
                    className={`next ${currentPage === pages ? 'disabled' : ''}`}
                >
                    next
                </button>
            </div>

            <Pagination className="pagination">
                {/*<Pagination.First/>*/}
                <Pagination.Prev role={"button"} onClick={goToPreviousPage}
                                          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}/>
                {getPaginationGroup().map((item, index) => (
                    <Pagination.Item key={index}
                                              onClick={changePage}
                                              className={`paginationItem ${currentPage === item ? 'active' : null}`}>
                        {index}
                    </Pagination.Item>
                ))}
                {/*<Pagination.Ellipsis/>*/}
                <Pagination.Next onClick={goToNextPage}
                                 className={`next ${currentPage === pages ? 'disabled' : ''}`}/>
                {/*<Pagination.Last/>*/}
            </Pagination>
        </div>
    );
}

export default ComponentPagination;