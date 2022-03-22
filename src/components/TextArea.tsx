import { ChangeEvent, useState, FC, useCallback } from "react";
import { MemoList } from "./MemoList";
import { ButtonAppBar } from "./Header"
import { useMemoList } from "../fooks/useMemoList";
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

export const TestArea = () => {
    //カスタムフックから取得
    const { memos, addTodo, deleteTodo } = useMemoList();
    //テキストボックスState
    const [text, setText] = useState<string>("");
    //トグルボタンState
    const [alignment, setAlignment] = useState<string>('');

    //トグルボタン押下時
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
        console.log(newAlignment);
    };

    //テキストボックス入力時に入力内容をStateに設定
    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    //[追加]ボタン押下時
    const onClickAdd = () => {
        //中身が空の場合を除き実行する
        if (text !== "") {
            //カスタムフックのメモ追加ロジック実行
            addTodo(text);
            //テキストボックスを空に
            setText("");
        }
    };

    //[削除]ボタン押下時(何番目が押されたかを引数で受け取る)
    const onClickDelete = useCallback((index: number) => {
        //カスタムフックメモ削除ロジック実行
        deleteTodo(index);
    }, [deleteTodo]);

    return (
        <>
            <Typography variant="h2" component="h1" gutterBottom sx={{ mt: 10 }} >
                テストエリア
            </Typography>
            <h1>簡単メモアプリ</h1>
            <TextField id="outlined-basic" label="input text" variant="outlined" value={text} onChange={onChangeText} />
            <CustomTextField id="outlined-basic" label="input text" variant="outlined" value={text} onChange={onChangeText} />
            {/* <input type="text" value={text} onChange={onChangeText} /> */}
            <Button variant="contained" onClick={onClickAdd} sx={{ m: 1, }}>Add</Button>
            <MyButton onClick={onClickAdd}>Add</MyButton>
            <CustomButton variant="contained" onClick={onClickAdd}>Add</CustomButton>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
            >
                <ToggleButton value="web" >Web</ToggleButton>
                <ToggleButton value="android" >Android</ToggleButton>
                <ToggleButton value="ios" >iOS</ToggleButton>
            </ToggleButtonGroup>
            <Box sx={{ color: 'primary.main', p: 2 }}>
                Hoge
            </Box>
            <MemoList memos={memos} onClickDelete={onClickDelete} />
        </>

    );
}

const NewGameBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});
const NewGameButton = styled(Button)({
    display: 'block',
    margin: '0 auto'
});

const CustomButton = styled(Button)({
    backgroundColor: 'red'
});
const CustomTextField = styled(TextField)({
    backgroundColor: 'red',
    margin: '0 1em',
});
const STextField = styled.button`
  border: solid 1px #ccc;
  padding: 16px;
  margin: 8px;
  `;

const MyButton = styled(Button)({
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
});