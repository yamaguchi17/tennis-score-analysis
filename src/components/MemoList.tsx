import { FC } from "react";
import styled from '@emotion/styled'
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

//必要なPropsはメモ一覧と削除時に実行する関数
type Props = {
    memos: string[];
    onClickDelete: (index: number) => void;
};

export const MemoList: FC<Props> = (props) => {
  const { memos, onClickDelete } = props;

  //メモ押下時
  const onClickShow = (memo: string) => {
    //

  };
    
  return (
    <SContainer>
      <p>メモ一覧</p>
      <ul>
        {memos.map((memo, index) => (
          <li key={memo} style={{ listStyle: "none" }} >
            <SMemoWrapper>
              <Button variant="outlined">{memo}</Button>
              <IconButton aria-label="delete" onClick={() => onClickDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </SMemoWrapper>
          </li>
        ))}
      </ul>
    </SContainer>
  );
};


const SContainer = styled.div`
  border: solid 1px #ccc;
  padding: 16px;
  margin: 8px;
`;
const SMemoWrapper = styled.div`
  display: flex;
  align-items: center;
`;