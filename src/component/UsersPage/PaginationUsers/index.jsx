import React from "react";
import { useSelector } from "react-redux";
import PaginationUsersItem from "../PaginationUsersItem";
import "./PaginationUsers.scss";
function PaginationUsers(props) {
  let listPagination = useSelector((state) => {
    return state.userReducer.infoPagination;
  });
  let pageDisplay = 5;
  let currentPage = useSelector((state) => {
    return state.userReducer.currentPagination;
  });
  if (listPagination) {
    console.log(listPagination.totalPages);
  }
  let listpageShowing = [];
  function renderPagination() {
    if (listPagination) {
      let endPage = currentPage;
      if (endPage > pageDisplay) {
        if (currentPage === listPagination.totalPages) {
          endPage = endPage - 1;
        }
        for (let j = endPage - pageDisplay; j <= endPage + 1; j++) {
          listpageShowing.push(<PaginationUsersItem item={j} />);
        }
      } else {
        for (let i = 1; i <= endPage + 1; i++) {
          listpageShowing.push(<PaginationUsersItem item={i} />);
        }
      }
      return currentPage > listPagination.totalPages - 5 ? (
        <div>
          <li>
            <a href="#0">&lt;</a>
          </li>
          <PaginationUsersItem item={1} />
          <PaginationUsersItem item={2} />
          ...
          {listpageShowing}
          <li>
            <a href="#0">&gt;</a>
          </li>
        </div>
      ) : (
        <div>
          <li>
            <a href="#0">&lt;</a>
          </li>
          {listpageShowing}...
          {<PaginationUsersItem item={listPagination.totalPages} />}
          <li>
            <a href="#0">&gt;</a>
          </li>
        </div>
      );
    }
  }

  // function renderPagination() {
  //   if (listPagination) {
  //     let listpageShowing = [];
  //     let endPage = listPagination?.totalPages;
  //     listpageShowing.push(<PaginationUsersItem item={1} />);
  //     if (currentPage > endPage - 2) listpageShowing.push("....");
  //     for (
  //       let i = Math.min(Math.max(currentPage - 2, 2), endPage - 4);
  //       i <= Math.min(currentPage + 2, endPage - 1);
  //       i++
  //     )
  //       listpageShowing.push(<PaginationUsersItem item={i} />);
  //     if (currentPage < endPage - 1) listpageShowing.push("....");
  //     listpageShowing.push(<PaginationUsersItem item={endPage} />);
  //     return <div>{listpageShowing}</div>;
  //   }
  // }
  return (
    <div className="paginationUser">
      <ul className="pagination">{renderPagination()}</ul>
    </div>
  );
}

export default PaginationUsers;
