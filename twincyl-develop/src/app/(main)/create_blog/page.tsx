import MainContainer from "@/src/components/MainContainer";
import BlogCreator from "../_components/BlogCreator";

export default function CreateBlog() {
    return (
        <MainContainer title="ブログを作成">
            <BlogCreator type="blog" />
        </MainContainer>
    );
}