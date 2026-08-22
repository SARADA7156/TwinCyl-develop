import MainContainer from "@/src/components/MainContainer";
import BlogEditor from "../_components/BlogEditor/BlogEditor";

export default function CreateBlog() {
    return (
        <MainContainer title="ブログを作成">
            <BlogEditor />
        </MainContainer>
    );
}