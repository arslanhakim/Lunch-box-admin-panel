import { useState, useEffect } from 'react'
import { Layout } from '../../../../components/layout/layout'
import swal from 'sweetalert'
import { Card } from './Card'
import { AddRecipe } from './AddRecipe'
import { Header } from '../../../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { onDeleteRecipe } from '../../../../redux/actions/recipe.action'
import { Pagination } from '../../../../components/Pagination'

export const Recipe = () => {
    const recipebooks = useSelector(
        (state: any) => state?.RecipeBookReducer?.recipebook
    )
    const [addModal, setAddModal] = useState(false)
    const [recipeList, setRecipeList] = useState<any>([...recipebooks])
    const [currentItemList, setCurrentItemList] = useState<any>([])

    const [editRecipe, setEditRecipe] = useState('')
    const dispatch = useDispatch<any>()

    const onEdit = (item: any) => {
        setEditRecipe(item)
        setAddModal(true)
    }
    const addNewRecipe = () => {
        setEditRecipe('')
        setAddModal(!addModal)
    }

    useEffect(() => {
        setRecipeList([...recipebooks])
    }, [recipebooks])

    const onDeleteItem = (item: any) => {
        swal({
            title: `Delete this Recipe?`,
            text: `Are you sure want to delete ${
                item.title + ' ' + item.title
            }?`,
            icon: 'warning',
            buttons: ['Cancel', ' Confirm'],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                dispatch(onDeleteRecipe(item?.recipe_book_id))
            }
        })
    }

    const content = (
        <div className="pl-4 md:pl-8 mr-6 ">
            <Header
                title="Recipe Book"
                list={recipebooks}
                onApplyFunction={addNewRecipe}
                searchBar={true}
            />

            <div className="grid lg:grid-cols-3 grid-cols-2 mt-6 gap-2 z-1 ">
                {currentItemList?.map((items: any, id: any) => (
                    <div key={id}>
                        <Card
                            id={id}
                            items={items}
                            onDeleteItem={onDeleteItem}
                            setEditRecipe={onEdit}
                        />
                    </div>
                ))}
            </div>

            {addModal && (
                <AddRecipe
                    addModal={addModal}
                    setAddModal={setAddModal}
                    items={editRecipe}
                />
            )}

            <Pagination
                list={recipeList}
                setCurrentItemList={setCurrentItemList}
                currentItemList={currentItemList}
            />
        </div>
    )

    return <Layout children={content} />
}
